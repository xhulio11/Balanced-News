import asyncio
import time
async def fetch_data():
    print("Fetching data...")
    await asyncio.sleep(3)  # Simulating network delay
    print("Data fetched!")

async def print_numbers():
    for i in range(1, 6):
        print(i)
        await asyncio.sleep(1)  # Simulating some processing delay

async def main():
    # Run both tasks concurrently
    await asyncio.gather(fetch_data(), print_numbers())

start_time = asyncio.run(main())
end_time = time.time()

print(f"Total execution time: {end_time - start_time:.2f} seconds")
