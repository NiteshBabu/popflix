
const YoutubeEmbed = ({
  id,
}: {
  id: string
}) => {
  return (
    <div
      style={{
        position: 'relative',
        padding: '56.25% 0 0 0',
      }}
    >
      <iframe
        width="100%"
        style={{ position: 'absolute', inset: 0, aspectRatio: '16 / 9' }}
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default YoutubeEmbed
