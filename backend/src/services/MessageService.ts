import fs from 'fs';
import parse from 'csv-parse';

interface IReadCsv {
    message?: number;
    weather?: number;
    time: string;
    hexPayload: string;
}

export function readCsv(path: string): Promise<IReadCsv[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err)
            } else {
                parse(data, { columns: true }, (err, output) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(output)
                    }
                })
            }
        })
    })
}


export function splitBy2Chars(hexString: string): string[] {
    let result: string[] = []
    for (let i = 0; i < hexString.length; i += 2) {
        result.push(hexString.substr(i, 2))
    }
    return result
}

export function hexToDecimal(hex: string): number {
    return parseInt(hex, 16)
}

export function hexToMessage(hex: string[]): number {
    return hex.map(h => hexToDecimal(h)).reduce((acc, curr) => acc + curr, 0);
}


export function castCsv(data) {
    const csv = data.map(item => {
        const splitHex = splitBy2Chars(item.hexPayload);
        let [_, ...message] = splitHex;

        item.message = hexToMessage(message);
        return {
            time: new Date(item.time),
            message: item.message
        }
    });
    return csv;

}

export function getCharts(data) {
    const chart = data.reduce((acc, curr) => {
        const messageDate = new Date(curr.time).toLocaleDateString();
        if(acc.has(messageDate)) {
            acc.set(messageDate, acc.get(messageDate) + 1);
        }else{
            acc.set(messageDate, 1);
        }
        return acc;
    }, new Map());
    return Object.fromEntries(chart);
}