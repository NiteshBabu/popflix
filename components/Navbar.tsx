'use client'
import {
  Avatar,
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'

const Navbar = () => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const user = {
    email: 'niteshbabu@gmail.com',
  }
  return (
    <Box py="4" mb="2">
      <Container maxW={'container.xl'}>
        <Flex justifyContent={'space-between'}>
          <Link href="/">
            <Box
              fontSize={'2xl'}
              fontWeight={'bold'}
              color={'red'}
              letterSpacing={'widest'}
              fontFamily={'mono'}
            >
              POPFLIX
            </Box>
          </Link>

          {/* DESKTOP */}
          <Flex
            gap="4"
            alignItems={'center'}
            display={{ base: 'none', md: 'flex' }}
          >
            <Link href="/">Home</Link>
            <Link href="/movies">Movies</Link>
            <Link href="/shows">Shows</Link>
            <Link href="/search">
              <SearchIcon fontSize={'xl'} />
            </Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={'red.500'}
                    color={'white'}
                    size={'sm'}
                    name={user?.email}
                  />
                </MenuButton>
                <MenuList>
                  <Link href="/watchlist">
                    <MenuItem>Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={() => console.log('Todo Logout')}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>

          {/* Mobile */}
          <Flex
            display={{ base: 'flex', md: 'none' }}
            alignItems={'center'}
            gap="4"
          >
            <Link href="/search">
              <SearchIcon fontSize={'xl'} />
            </Link>
            <IconButton onClick={onOpen} icon={<HamburgerIcon />} aria-label='Menu Toggle' />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={'black'}>
                <DrawerCloseButton />

                <DrawerBody>
                  <Flex flexDirection={'column'} gap={'4'} onClick={onClose}>
                    <Link href="/">Home</Link>
                    <Link href="/movies">Movies</Link>
                    <Link href="/shows">TV Shows</Link>
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
