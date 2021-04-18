import {
  Resolver,
  Query,
  Arg
} from "type-graphql";

import { File } from "./type";

@Resolver(_of => File)
export class FileResolver {
  private readonly items: File[] = [
    {"path": "aa", "attributes":"aa", "size": 5},
    {"path": "aa", "attributes":"bb", "size": 5},
    {"path": "aa", "attributes":"cc", "size": 5}
  ];

  @Query(_returns => [File], { nullable: true, description: "Get all the files from a folder's path" })
  async file(@Arg("path") path: string): Promise<File[] | undefined> {
    return await this.items.filter(file => file.path === path);
  }
}