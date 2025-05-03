import { exec } from 'child_process';
import fs from 'fs';

export interface NodeData {
    id: string // wallet
    timestamp: number,
    packages: PackageData[]
}

export type NodeMetada = {
    so: string,
    hostname: string,
    serial_number: string // dmidecode -s system-serial-number
}

export type PackageData = {
    name: string,
    version: string
}

export function get_packages(): PackageData[] {
    const packages_json = "versions.json"
    const file_content = fs.readFileSync(packages_json, 'utf-8')
    const json = JSON.parse(file_content)
    return json.packages;
}

export function update_packges(consensus_packages: PackageData[]): void {
    let to_json = JSON.stringify({packages: consensus_packages});
    fs.writeFileSync("versions.json", to_json);
}

function command(command: string): any {
    exec('command', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error ejecutando el comando: ${error}`);
            return {undefined, error};
        }
        return {stdout, stderr}
    });
}