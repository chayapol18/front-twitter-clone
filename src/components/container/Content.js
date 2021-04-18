import { Button, Flex, Text } from '@chakra-ui/react'

function Content({header, body}) {
    return(
        <Flex ml='395px' w='600px' direction='column'>
            <Text textAlign='left' fontSize='20px' fontWeight='700' borderBottom='1px' borderColor='gray.200' p='13px' bgColor='white' position='fixed' w='600px' zIndex={1}>
                {header}
            </Text>
            <Flex w='100%' alignItems='center' mt='55px' >
                {body}
            </Flex>
        </Flex>
    )
}

export default Content