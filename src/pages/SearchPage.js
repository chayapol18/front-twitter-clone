import Menulist from '../components/banner/Menulist'
import Search from '../components/search/Search'
import Content from '../components/container/Content'
import { Text, Flex, Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons'

function SearchPage() {

    return (
        <Flex direction='row'>
            <Menulist />
            <Content
                header={
                    <InputGroup  w='550px' mb='-12px' mt='-3px'  >
                        <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.400" mt='6px' />}
                        />
                        <Input type="text" placeholder="Search Twitter" bgColor='gray.200' h='45px' borderRadius='full' />
                    </InputGroup>
            }>
                <Search/>
            </Content>   
            <Flex h='721px' borderLeft='1px' borderColor='gray.200' posi position='fixed'  ml='995px'>
            </Flex>
        </Flex>
    )
}

export default SearchPage