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

export async function extractPackagesWithVersions(): Promise<Array<PackageData>> {
	return new Promise((resolve, reject) => 
    exec('sudo pacman -Q', (error, stdout, stderr) => {
			if (error) {
				console.error(`Error ejecutando el comando: ${error}`);
				reject({error, stderr});
			}

			resolve(stdout.split(`\n`)
				.filter(p => p.trim().length > 0)
				.map(p => {
					const [packageName, packageVersion] = p.split(' ')
					return {
						name: packageName,
						version: packageVersion
					};
				})
		 );
		}));
}

export async function getSerialNumber() {
    return new Promise((resolve, reject) =>
        exec('sudo dmidecode -s system-serial-number', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error ejecutando el comando: ${error}`);
            reject({error, stderr});
        }
        resolve(stdout);
    }));
}
