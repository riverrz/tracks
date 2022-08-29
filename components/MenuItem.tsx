import NextLink from "next/link";
import { ListIcon, ListItem, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import { As } from "@chakra-ui/react";

interface Props {
  data: {
    name: string;
    icon: As<any>;
    route: string;
  };
}

const MenuItem = ({ data }: Props) => {
  const { name, icon, route } = data;
  return (
    <ListItem paddingX="20px" fontSize="16px">
      <LinkBox>
        <NextLink href={route} passHref>
          <LinkOverlay>
            <ListIcon as={icon} color="white" marginRight="20px" />
            {name}
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </ListItem>
  );
};

export default MenuItem;
