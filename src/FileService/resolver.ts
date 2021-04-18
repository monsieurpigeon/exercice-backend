import {
  Resolver,
  Query,
  Arg
} from "type-graphql";

import { File } from "./type";
import { readdir } from 'fs';



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
    return files.map((file) => {
      return {
        path, size: 5, attributes: file
      }
    })
  }
}