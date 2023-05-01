'use client'

import { SSRProvider } from 'react-aria-components'

export const RootLayoutClient = ({ children }: React.PropsWithChildren) => {
	return <SSRProvider>{children}</SSRProvider>
}
