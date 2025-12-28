import { spawn } from "node:child_process"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import autocannon from "autocannon"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, "..")

// Configuration - more realistic settings
const url = process.argv[2] || "http://localhost:3000"
const runs = Number.parseInt(process.argv[3], 10) || 5
const duration = Number.parseInt(process.argv[4], 10) || 30 // 30 seconds is more realistic
const connections = Number.parseInt(process.argv[5], 10) || 50 // 50 concurrent connections is more realistic
const spawnServer = process.argv.includes("--spawn-server")

// Memory tracking helper
function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

function getMemoryUsage() {
  if (typeof process.memoryUsage === "function") {
    return process.memoryUsage()
  }
  return null
}

// Spawn server if requested
async function startServer() {
  if (!spawnServer) {
    return null
  }

  console.log("Spawning server process...")
  const proc = spawn("node", [".output/server/index.mjs"], {
    cwd: projectRoot,
    stdio: "pipe",
    env: { ...process.env },
  })

  proc.stdout.on("data", (data) => {
    const output = data.toString()
    if (output.includes("listening") || output.includes("ready")) {
      console.log("Server started, waiting 2s for warmup...")
    }
  })

  proc.stderr.on("data", (data) => {
    console.error(`Server error: ${data}`)
  })

  // Wait a bit for server to start
  await new Promise((resolve) => {
    setTimeout(resolve, 3000)
  })

  return proc
}

const serverProcess = await startServer()

console.log(
  `Running ${runs} benchmarks of ${duration}s each on ${url}\n` +
    `Settings: ${connections} connections, ${duration}s duration\n`,
)

const results = []
const latencyResults = []
const memorySnapshots = []

// Take initial memory snapshot if server is spawned
if (serverProcess) {
  const mem = getMemoryUsage()
  if (mem) {
    memorySnapshots.push({ time: "initial", ...mem })
  }
}

for (let i = 0; i < runs; i++) {
  console.log(`Run ${i + 1}/${runs}...`)

  // Memory before
  const memBefore = serverProcess ? getMemoryUsage() : null

  const result = await autocannon({
    url,
    duration,
    connections,
    pipelining: 1, // Realistic: one request per connection
  })

  // Memory after
  const memAfter = serverProcess ? getMemoryUsage() : null

  const reqPerSec = result.requests.average
  const avgLatency = result.latency.average
  results.push(reqPerSec)
  latencyResults.push(avgLatency)

  if (memBefore && memAfter) {
    const memDiff = {
      run: i + 1,
      heapUsed: memAfter.heapUsed - memBefore.heapUsed,
      heapTotal: memAfter.heapTotal - memBefore.heapTotal,
      rss: memAfter.rss - memBefore.rss,
      external: memAfter.external - memBefore.external,
    }
    memorySnapshots.push(memDiff)
  }

  console.log(`  Requests/sec: ${reqPerSec.toFixed(2)}`)
  console.log(`  Avg latency: ${avgLatency.toFixed(2)}ms`)
  if (memAfter) {
    console.log(`  Memory (RSS): ${formatBytes(memAfter.rss)}`)
    console.log(`  Memory (Heap): ${formatBytes(memAfter.heapUsed)}`)
  }
  console.log()
}

// Cleanup
if (serverProcess) {
  console.log("Stopping server...")
  serverProcess.kill()
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

// Calculate statistics
const avgReqPerSec = results.reduce((a, b) => a + b, 0) / results.length
const minReqPerSec = Math.min(...results)
const maxReqPerSec = Math.max(...results)

const avgLatency =
  latencyResults.reduce((a, b) => a + b, 0) / latencyResults.length
const minLatency = Math.min(...latencyResults)
const maxLatency = Math.max(...latencyResults)

// Memory statistics
let memoryStats = null
if (memorySnapshots.length > 1) {
  const memDiffs = memorySnapshots.slice(1) // Skip initial snapshot
  memoryStats = {
    avgHeapUsed:
      memDiffs.reduce((sum, m) => sum + m.heapUsed, 0) / memDiffs.length,
    avgRSS: memDiffs.reduce((sum, m) => sum + m.rss, 0) / memDiffs.length,
    maxHeapUsed: Math.max(...memDiffs.map((m) => m.heapUsed)),
    maxRSS: Math.max(...memDiffs.map((m) => m.rss)),
  }
}

// Print results
console.log("=".repeat(60))
console.log("BENCHMARK RESULTS")
console.log("=".repeat(60))
console.log("\nRequests/Second:")
console.log(`  Average: ${avgReqPerSec.toFixed(2)}`)
console.log(`  Min: ${minReqPerSec.toFixed(2)}`)
console.log(`  Max: ${maxReqPerSec.toFixed(2)}`)
console.log(`  All runs: ${results.map((r) => r.toFixed(2)).join(", ")}`)

console.log("\nLatency (ms):")
console.log(`  Average: ${avgLatency.toFixed(2)}`)
console.log(`  Min: ${minLatency.toFixed(2)}`)
console.log(`  Max: ${maxLatency.toFixed(2)}`)

if (memoryStats) {
  console.log("\nMemory Usage (per run):")
  console.log(`  Avg Heap Used: ${formatBytes(memoryStats.avgHeapUsed)}`)
  console.log(`  Avg RSS: ${formatBytes(memoryStats.avgRSS)}`)
  console.log(`  Max Heap Used: ${formatBytes(memoryStats.maxHeapUsed)}`)
  console.log(`  Max RSS: ${formatBytes(memoryStats.maxRSS)}`)
} else if (!spawnServer) {
  console.log(
    "\nNote: Memory tracking requires --spawn-server flag.\n" +
      "Run with: pnpm benchmark:avg --spawn-server",
  )
}

console.log("=".repeat(60))
