import {
  Resolver,
  Query,
  Arg
} from "type-graphql";

import { File } from "./types";
import { readdir } from 'fs';
import { stat } from "fs";
import pathLib = require("path")

const FILE_SYSTEM_ROOT = 'filesystem';

@Resolver(File)
export class FileResolver {

  @Query(() => [File], { nullable: true, description: "Get all the files from a folder's path" })
  async files(@Arg("path") pathInput: string): Promise<File[] | undefined> {
    // Poison Null Bytes
    if (pathInput.indexOf('\0') !== -1) {
      throw new Error("That was evil.");
    }

    const path = pathLib.join(FILE_SYSTEM_ROOT, pathInput);
    if (path.indexOf(FILE_SYSTEM_ROOT) !== 0) {
      throw new Error("Would you stay in your file system please ?!");
    }

    const files: string[] = await new Promise((resolve, reject) => {
      readdir(path, (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    });

    return Promise.all(files.map((file) => {
      return new Promise<File>((resolve, reject) => {
        const filePath = pathLib.join(path, file)
        stat(filePath, (err, stats) => {
          if (err) reject(err);
          resolve({
            path: filePath,
            size: stats.size,
            attributes: {
              lastRead: stats.atime,
              lastUpdate: stats.mtime,
              lastMetadataUpdate: stats.ctime,
              birthTime: stats.birthtime,
              isFile: stats.isFile(),
              isDirectory: stats.isDirectory(),
              isSymbolicLink: stats.isSymbolicLink()
            }
          });
        })
      });
    }))
  }
}