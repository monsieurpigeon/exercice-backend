import {
  Resolver,
  Query,
  Arg
} from "type-graphql";

import { File } from "./types";
import { readdir } from 'fs';
import { stat } from "fs";

@Resolver(_of => File)
export class FileResolver {

  @Query(_returns => [File], { nullable: true, description: "Get all the files from a folder's path" })
  async files(@Arg("path") path: string): Promise<File[] | undefined> {
    const files: string[] = await new Promise((resolve, reject) => {
      readdir(path, (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    })
    return Promise.all(files.map((file) => {
      return new Promise<File>((resolve, reject) => {
        stat(`${path}/${file}`, (err, stats) => {
          if (err) reject(err);
          resolve({
            path:`${path}/${file}`, size: stats.size, attributes: {
              lastRead: stats.atime,
              lastUpdate: stats.mtime,
              lastMetadataUpdate: stats.ctime,
              birthTime: stats.birthtime,
              isFile: stats.isFile(),
              isDirectory: stats.isDirectory()
            }
          });
        })
      });
    }))
  }
}