import Menulist from "../components/banner/Menulist";
import TrendBar from "../components/banner/TrendBar";
import Content from "../components/container/Content";
import { Flex } from "@chakra-ui/react";
import Bookmark from "../components/tweet/Bookmark";

function BookmarksPage() {
  return (
    <Flex direction="row">
      <Menulist pathName="Bookmark" />

      <Content header="Bookmarks">
        <Bookmark pathName="Bookmark" />
      </Content>

      <TrendBar />
    </Flex>
  );
}

export default BookmarksPage;
