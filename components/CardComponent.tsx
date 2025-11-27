import { StarIcon } from '@chakra-ui/icons'
import { Box, Flex, Skeleton, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { imagePath } from '../services/api'
import { TMDBResponseType } from '../utils/types'

const CardComponent = ({
	item,
	height = 355,
	isLoading,
}: {
	item: TMDBResponseType
	height?: number
	isLoading?: boolean
}) => {
	const [fetchingImg, setFetchingImg] = useState(true)
	const href =
		item?.media_type === 'person'
			? `${item?.media_type}/${item?.id}`
			: `/info/${item?.media_type}/${item?.id}`

	if (isLoading) return <Skeleton height={height} />
	return (
		<Link href={href} style={{ cursor: 'pointer' }}>
			<Box
				position={'relative'}
				transform={'scale(1)'}
				_hover={{
					transform: { base: 'scale(1)x', md: 'scale(1.08)' },
					transition: 'transform 0.2s ease-in-out',
					zIndex: '10',
					'& .overlay': {
						height: '30%',
						opacity: 1,
					},
				}}
				>
				<Box
					backgroundImage={`https://ik.imagekit.io/rnuojrep8l${
						item?.poster_path || item?.profile_path
					}?tr=w-50,bl-2`}
					backgroundSize='contain'
					aspectRatio={2 / 3}
					>
					<Image
						src={`${imagePath}/${item?.poster_path || item?.profile_path}`}
						alt={item?.title || item?.name}
						fill
						onLoad={() => setTimeout(() => setFetchingImg(false), 800)}
						style={{
							opacity: fetchingImg ? 0 : 1,
							objectFit: 'contain',
						}}
					/>
				</Box>
				<Box
					className='overlay'
					pos={'absolute'}
					p='2'
					bottom={'0'}
					left={'0'}
					w={'100%'}
					h={'0'}
					zIndex={'5'}
					opacity={'0'}
					bg='rgba(0,0,0,0.9)'
					transition={'all 0.3s ease-in-out'}>
					<Text
						textAlign={'center'}
						fontWeight={'bolder'}
						fontSize={{ base: 'small', md: 'medium' }}>
						{item?.title || item?.name}
					</Text>
					<Text
						textAlign={'center'}
						fontSize={'x-small'}
						fontWeight={'bold'}
						color={'teal.100'}>
						{new Date(
							item?.release_date || item?.first_air_date
						).getFullYear() || 'N/A'}
					</Text>
				</Box>
				<Flex
					alignItems={'center'}
					justifyContent={'center'}
					gap={1}
					mt='2'
					mr='2'
					pos={'absolute'}
					top={0}
					right={0}
					p={'3px 6px'}
					borderRadius={5}
					bg={'rgba(0,0,0,0.4)'}>
					<StarIcon fontSize={'small'} fill={'tomato'} />
					<Text fontSize={'small'}>{item?.vote_average?.toFixed(1)}</Text>
				</Flex>
			</Box>
		</Link>
	)
}

export default CardComponent
