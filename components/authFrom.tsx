import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextImage from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import { auth } from "../lib/mutations";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/"); // in case the user signin or signup, the data is already fetched
  }, [router]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      await auth(mode, { email, password });
      setIsLoading(false);
      router.push("/");
    },
    [email, mode, password, router]
  );

  return (
    <Box height="100vh" width="100vw" color="white" bg="black">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
              type="submit"
              bg="green.500"
              isLoading={isLoading}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
