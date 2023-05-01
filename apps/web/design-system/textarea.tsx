import * as React from 'react'

export const Textarea = ({
	rows = 3,
	...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
	const textareaRef = React.useRef<HTMLTextAreaElement>(null)
	React.useEffect(() => {
		if (!textareaRef.current) {
			return
		}

		const onKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Enter' && event.metaKey) {
				const form = (event.target as HTMLTextAreaElement).closest('form')
				form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
			}
		}

		textareaRef.current.addEventListener('keydown', onKeydown)
		return () => {
			textareaRef.current?.removeEventListener('keydown', onKeydown)
		}
	}, [])
	return (
		<textarea
			className="flex-grow rounded-md border-gray-200 focus-visible:ring-1 focus-visible:ring-indigo-600"
			ref={textareaRef}
			rows={rows}
			{...props}
		/>
	)
}
