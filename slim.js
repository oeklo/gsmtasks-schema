replace("$..[?@.content[?match(#, 'application/json; version=[0-9.]+')]]", value => {
    for (const [key, v] of Object.entries(value.content)) {
        if (/version/.test(key)) {
            const newKey = key.replace(/^([^;]+); version=[\d.]+$/, (_, mime) => `${mime}; version=\${version}`)
            delete value.content[key];
            value.content[newKey] = v;
        }
    }
    return value;
});

replace('$..[?@.example]', schema => {
    if (!('example' in schema) || typeof schema.example !== 'string')
        return schema
    let example = schema.example
    if (/\b[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}\b/gi.test(example)) {
        delete schema.example;
        return schema
    } else if (/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[+-][0-9]{2}:[0-9]{2}/.test(schema.example))
        example = example.replace(
            /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[+-][0-9]{2}:[0-9]{2}/g,
            '2000-01-01T00:00:00+00:00')

    schema.example = example
    return schema;
})

replace('$..examples[?search(@.value, "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}")].value', value => {
    return value.replace(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,
        '123e4567-e89b-12d3-a456-426614174000')
})
