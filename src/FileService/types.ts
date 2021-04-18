import { Field, ObjectType, Int } from "type-graphql";

@ObjectType({ description: "Object representing attributes of a file" })
export class FileAttributes {
  @Field(_type => Date)
  lastRead: Date;

  @Field(_type => Date)
  lastUpdate: Date;

  @Field(_type => Date)
  lastMetadataUpdate: Date;

  @Field(_type => Date)
  birthTime: Date;

  @Field(_type => Boolean)
  isFile: Boolean;

  @Field(_type => Boolean)
  isDirectory: Boolean;
}

@ObjectType({ description: "Object representing a file" })
export class File {
  @Field()
  path: string;

  @Field(_type => Int)
  size: number;

  @Field(_type => FileAttributes, {description: "attibutes of the file"})
  attributes: FileAttributes;
}