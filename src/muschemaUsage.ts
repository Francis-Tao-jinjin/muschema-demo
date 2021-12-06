import {
  MuStruct,
  MuFloat32,
  MuUTF8,
  MuArray,
  MuVarint,
  MuDictionary,
  MuASCII,
  MuUnion,
} from "mudb/schema";

export const UserSchema = new MuUnion(
  {
    entry: new MuStruct({
      storage: new MuFloat32(1024),
    }),
    premium: new MuStruct({
      storage: new MuFloat32(5120),
      assets: new MuVarint(400),
    }),
  },
  "entry" // this will tell the UserSchema use 'entry' as default value (identity)
);

export const ResourceSchema = new MuStruct({
  id: new MuVarint(0),
  url: new MuUTF8(""),
});

export const ProjectSpecSchema = new MuStruct({
  workSpaceSize: new MuArray(new MuVarint(0), 3), // [number, number, number]
  resourcesUrl: new MuDictionary(ResourceSchema, Infinity),
});

// this is how you can generate the Type if you are using  TypeScript
export type ProjectSpecType = typeof ProjectSpecSchema.identity;

export const ProjectSchema = new MuStruct({
  name: new MuUTF8("new_project"), // you can assign a default value to the property
  version: new MuFloat32(1.0),
  spec: ProjectSpecSchema,
  uuid: new MuASCII(""),
  userType: UserSchema,
});

export type ProjectInfo = typeof ProjectSchema.identity;
