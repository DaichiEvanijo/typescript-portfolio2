
const Footer = () => {
  const today = new Date()
  return (
    <footer className="container">
      {today.getFullYear()} | Designed & coded by Daichi
  </footer>
  )
}

export default Footer