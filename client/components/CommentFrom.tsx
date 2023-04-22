import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IForm {
  _id: string;
  comment: string;
}

function CommentFrom({ post, setSubmitted }: any) {
  const { register, handleSubmit, formState: { errors } } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    await fetch('/api/createComment', {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((res: any) => {
        setSubmitted(true);
      })
      .catch((err: any) => {
        setSubmitted(false);
      })
  }

  return (
    <>
      <form className='flex flex-col max-w-2xl mx-auto mb-10' onSubmit={handleSubmit(onSubmit)}>

        <input type="hidden" value={post._id} {...register("_id")} />

        <label>
          <span className='text-grey-700' >Comment</span>
          <textarea className='shadow rounded py-2 px-3  form-textarea mt-1 block w-full ring-yellow-500 outline:none focus:ring' rows={4} {...register("comment", { required: true })} />
        </label>

        <input type="submit"
          className='mt-10 shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer'
        />

      </form>
      <div className='mt-5'>
        {errors.comment ? <span className='text-red-500'>Comment is required field</span> : null}
      </div>
    </>
  )
}

export default CommentFrom;