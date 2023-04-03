function arrayToAsciiTable(data) {
    // Find all unique keys in the data
    const keys = Array.from(new Set(data.flatMap((obj) => Object.keys(obj))))

    // Build the data rows of the table
    const rows = data.map((obj) =>
        keys.map((key) => (obj[key] === undefined ? '' : obj[key].toString()))
    )

    // Determine the minimum width of each column
    const minWidths = keys.map((key, index) =>
        Math.max(key.length, ...rows.map((row) => row[index].length))
    )

    // Format each cell to have a minimum width and align values to the left
    const formattedRows = rows.map((row) =>
        row.map((cell, index) =>
            cell.padEnd(minWidths[index], ' ').padEnd(minWidths[index] + 1, ' ')
        )
    )

    // Build the header row of the table
    const header = keys.map((key, index) =>
        key
            .toUpperCase()
            .padEnd(minWidths[index], ' ')
            .padEnd(minWidths[index] + 1, ' ')
    )

    // Build the separator row of the table
    const separator = keys.map((key, index) => '-'.repeat(minWidths[index] + 1))

    // Combine the header, separator, and data rows into a single array
    const table = [header, separator, ...formattedRows]

    // Convert the table to a string
    return table.map((row) => row.join('')).join('\n')
}
