import useSWR from "swr";
import fetcher from "./fetcher";
import type { User, Playlist } from "./prisma";

type useMeResponse = {
  playlistsCount: number;
} & User;

export const useMe = () => {
  const { data, error } = useSWR<useMeResponse>("/me", fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR<Playlist[]>("/playlist", fetcher);

  return {
    playlists: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};
