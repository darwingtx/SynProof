import { exec } from 'child_process';
import fs from 'fs';

export interface BlockData {
    id: string // wallet
    data: NodeData
    timestamp: number
}

export type NodeData = {
    metadata: NodeMetadata,
    packages: PackageData[]
}

export type PackageData = {
    name: string,
    version: string
}

export type NodeMetadata = {
    so: string,
    hostname: string,
    serial_number: string // dmidecode -s system-serial-number
    state: NodeState
}

export enum NodeState {
    UPDATED,
    UPDATING,
    ERROR
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