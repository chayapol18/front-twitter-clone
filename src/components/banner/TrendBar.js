import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'


function TrendBar() {
    return(
        <Flex h='721px' borderLeft='1px' borderColor='gray.200' posi position='fixed'  ml='995px'>
            <InputGroup ml='25px' mt='4px' >
                <InputLeftElement
                pointerEvents="none"
                children={<Search2Icon color="gray.400" mt='6px' />}
                />
                <Input type="text" placeholder="Search Twitter" bgColor='gray.200' borderRadius='full' w='350px' h='45px' />
            </InputGroup>
        </Flex>
    )
}

export default TrendBar