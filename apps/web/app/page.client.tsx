'use client'

import * as React from 'react'
import { z } from 'zod'
import { Button } from '../design-system/button'
import { Textarea } from '../design-system/textarea'
import data from '../data.json'

export const IndexPageClient = () => {
	const [comments, setComments] = React.useState<TComment[]>(data.comments)
	return (
		<main className="bg-slate-100 p-3">
			<div className="mx-auto max-w-3xl">
				<div className="my-10 space-y-4">
					<CommentList comments={comments} onChange={setComments} />
					<CommentReplyForm
						onSubmit={(newComment) => setComments([...comments, newComment])}
						submitButtonLabel="Send"
					/>
				</div>
			</div>
		</main>
	)
}

const commentSchema = z.object({
	comment: z.string().min(1),
})

type TUser = { image: { png: string; webp: string }; username: string }

type TComment = {
	id: number
	content: string
	createdAt: string
	score: number
	user: TUser
	replyingTo?: string
	replies?: TComment[]
}

const CommentList = ({
	comments,
	onChange,
}: {
	comments: TComment[]
	onChange: (comments: TComment[]) => void
}) => {
	return (
		<div className="space-y-4">
			{comments.map((comment) => (
				<React.Fragment key={comment.id}>
					<Comment
						comment={comment}
						currentUser={data.currentUser}
						key={comment.id}
						onChange={(updatedComment) =>
							onChange(comments.map((c) => (c.id === comment.id ? updatedComment : c)))
						}
						onDelete={() => onChange(comments.filter((c) => c.id !== comment.id))}
						onReply={(newComment) => {
							onChange(comments.map((c) => (c.id === comment.id ? newComment : c)))
						}}
					/>
					{comment.replies && comment.replies.length > 0 && (
						<div className="border-l-2 border-gray-200 pl-4 sm:ml-8 sm:pl-8">
							<CommentList
								comments={comment.replies}
								onChange={(newReplies) => {
									// Update the current comment's replies with the new replies.
									const newComment = { ...comment, replies: newReplies }
									const newComments = comments.map((c) => (c.id === comment.id ? newComment : c))
									onChange(newComments)
								}}
							/>
						</div>
					)}
				</React.Fragment>
			))}
		</div>
	)
}

const Comment = ({
	comment,
	currentUser,
	onChange,
	onDelete,
	onReply,
}: {
	comment: TComment
	currentUser: (typeof data)['currentUser']
	onChange: (updatedComment: TComment) => void
	onDelete: (deletedComment: TComment) => void
	onReply: (newComment: TComment) => void
}) => {
	const [replyFormVisible, setReplyFormVisible] = React.useState(false)
	return (
		<div className="space-y-2">
			<div className="rounded-md bg-white p-3 shadow sm:p-6">
				<div className="flex items-center gap-2">
					<img src={comment.user.image.webp} alt="" className="h-10 w-10" />
					<span className="font-bold text-gray-700">{comment.user.username}</span>
					{currentUser.username === comment.user.username && (
						<span className="flex-grow-0 rounded-md bg-indigo-600 p-1 text-sm font-bold leading-4 text-white">
							you
						</span>
					)}
					<span className="text-gray-600">{comment.createdAt}</span>
				</div>
				{/* We probably want to clamp the comment content to a certain number of lines. */}
				<p className="mt-4 text-gray-700">
					{comment.replyingTo && (
						<span className="font-semibold text-indigo-600">@{comment.replyingTo}</span>
					)}{' '}
					{comment.content}
				</p>
				<div className="mt-4 flex gap-2">
					<ScoreVoter
						score={comment.score}
						onChange={(newScore) => onChange({ ...comment, score: newScore })}
					/>
					<div className="flex-grow" />
					{currentUser.username === comment.user.username ? (
						<Button color="red" onPress={() => onDelete(comment)}>
							<img src="/images/icon-delete.svg" />
							Delete
						</Button>
					) : (
						<Button color="indigo" onPress={() => setReplyFormVisible(!replyFormVisible)}>
							<img src="/images/icon-reply.svg" />
							Reply
						</Button>
					)}
				</div>
			</div>
			{replyFormVisible && (
				<CommentReplyForm
					onSubmit={(newComment) => {
						onReply({
							...comment,
							replies: comment.replies ? comment.replies.concat([newComment]) : [newComment],
						})
						setReplyFormVisible(false)
					}}
				/>
			)}
		</div>
	)
}

const CommentReplyForm = ({
	onSubmit,
	submitButtonLabel = 'Reply',
}: {
	onSubmit: (newComment: TComment) => void
	submitButtonLabel?: string
}) => {
	return (
		<form
			className="flex items-start gap-4 rounded-md bg-white p-4"
			onSubmit={(event) => {
				event.preventDefault()
				const parsed = commentSchema.safeParse(
					Object.fromEntries(new FormData(event.currentTarget)),
				)

				if (!parsed.success) {
					return
				}

				onSubmit({
					id: Math.random(),
					createdAt: 'a second ago',
					score: 0,
					user: data.currentUser,
					content: parsed.data.comment,
					replies: [],
				})
				event.currentTarget.reset()
			}}
		>
			<img src={data.currentUser.image.webp} alt="" className="h-12 w-12" />
			<Textarea placeholder="Add a comment..." name="comment" />
			<button
				className="w-20 rounded-md bg-indigo-600 p-2 uppercase tracking-wider text-white"
				type="submit"
			>
				{submitButtonLabel}
			</button>
		</form>
	)
}

const ScoreVoter = ({
	score,
	onChange,
}: {
	score: number
	onChange: (newScore: number) => void
}) => {
	return (
		<div className="flex items-center">
			<Button
				aria-label="Vote up"
				color="slate-100"
				variant="contained"
				onPress={() => onChange(score + 1)}
			>
				+
			</Button>
			<span className="h-full bg-slate-100 px-3 py-2 text-center font-semibold text-indigo-600">
				{score}
			</span>
			<Button
				aria-label="Vote down"
				color="slate-100"
				variant="contained"
				onPress={() => onChange(score - 1)}
			>
				-
			</Button>
		</div>
	)
}
