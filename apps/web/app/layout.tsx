import '../tailwind.css'
import { RootLayoutClient } from './layout.client'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<RootLayoutClient>{children}</RootLayoutClient>
			</body>
		</html>
	)
}

export default RootLayout
