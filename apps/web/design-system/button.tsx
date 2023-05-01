import * as React from 'react'
import { Button as AriaButton, ButtonProps } from 'react-aria-components'
import { VariantProps, cva } from 'class-variance-authority'

const buttonStyles = cva(
	'inline-flex items-center gap-2 font-semibold transition outline-none relative rounded-md  focus-visible:ring focus-visible:ring-indigo-600 focus-visible:ring-offset-2',
	{
		variants: {
			color: {
				indigo: 'text-indigo-600',
				red: 'text-red-600',
				'slate-100': 'bg-slate-100 hover:bg-slate-200',
			},
			variant: {
				contained: 'px-3 py-2',
			},
		},
		defaultVariants: {
			color: 'indigo',
		},
	},
)

export const Button = ({
	color,
	className,
	variant,
	...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>) => {
	return <AriaButton className={buttonStyles({ color, variant })} {...props} />
}
