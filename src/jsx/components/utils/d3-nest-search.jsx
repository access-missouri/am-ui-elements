export function searchD3NestByKey(nest, key){
    console.log(`searching for ${key}`);
    for (let m of nest){
        if (m.key === key){
            console.log(m);
            return m;
        }
    }
    return null;
}