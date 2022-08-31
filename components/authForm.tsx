import { Box, Flex, Input, Button } from "@chakra-ui/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../lib/mutations";

interface Props {
  mode: "signin" | "signup";
}

const AuthForm = ({ mode }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    let payload: Record<string, string> = { email, password };

    if (mode === "signup") {
      payload = { ...payload, firstname, lastname };
    }

    await auth(mode, payload);
    setIsloading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
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
            {mode === "signup" && (
              <>
                <Input
                  placeholder="Firstname"
                  type="text"
                  required
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <Input
                  placeholder="Lastname"
                  type="text"
                  required
                  onChange={(e) => setLastname(e.target.value)}
                />
              </>
            )}
            <Input
              placeholder="Email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
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
