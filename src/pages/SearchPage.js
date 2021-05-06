import Menulist from "../components/banner/Menulist";
import Search from "../components/search/Search";
import Content from "../components/container/Content";
import {
  Text,
  Flex,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "../config/axios";
import { useHistory } from "react-router-dom";

function SearchPage() {
  const [search, setSearch] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const history = useHistory();
  const handleSearch = async (searchData) => {
    try {
      const res = await axios.post("/users/search", { searchData });
      setDataUser(res.data.search);
    } catch (err) {}
  };

  const handleOtherUserPage = (userId) => {
    history.push("/other-user-page", { params: userId });
  };

  return (
    <Flex direction="row">
      <Menulist pathName="Search" />
      <Content
        header={
          <InputGroup w="580px" mb="-12px" mt="-3px">
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.400" mt="6px" />}
            />
            <Input
              type="text"
              placeholder="Search Twitter"
              bgColor="gray.200"
              h="45px"
              borderRadius="full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              fontSize="12px"
              borderRadius="full"
              mt="3px"
              ml='5px'
              onClick={() => handleSearch(search)}
            >
              Search
            </Button>
          </InputGroup>
        }
      >
        <Flex direction="column" w="100%">
          {dataUser.map((user) => (
            <Search dataUser={user} handleOtherUserPage={handleOtherUserPage} />
          ))}
        </Flex>
      </Content>
      <Flex
        h="721px"
        borderLeft="1px"
        borderColor="gray.200"
        posi
        position="fixed"
        ml="995px"
      ></Flex>
    </Flex>
  );
}

export default SearchPage;
