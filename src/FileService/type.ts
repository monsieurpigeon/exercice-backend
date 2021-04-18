import { Field, ObjectType, Int } from "type-graphql";

@ObjectType({ description: "Object representing a file" })
export class File {
  @Field()
  path: string;

  @Field(_type => Int)
  size: number;

  @Field({description: "attibutes of the file"})
  attributes: string;
}