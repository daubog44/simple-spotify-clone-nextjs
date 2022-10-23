import { PrismaClient, Prisma } from "@prisma/client";

export default new PrismaClient();

const user = Prisma.validator<Prisma.UserArgs>()({
  include: { playlist: true },
});

export type User = Prisma.UserGetPayload<typeof user>;

const playlist = Prisma.validator<Prisma.PlaylistArgs>()({
  include: { songs: true, user: true },
});

export type Playlist = Prisma.PlaylistGetPayload<typeof playlist>;

const artist = Prisma.validator<Prisma.ArtistArgs>()({
  include: { songs: true },
});

export type Artist = Prisma.ArtistGetPayload<typeof artist>;

const song = Prisma.validator<Prisma.SongArgs>()({
  include: { artist: true, playlist: true },
});

export type Song = Prisma.SongGetPayload<typeof song>;
