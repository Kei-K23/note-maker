import { updateNote } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { ComponentProps, FormEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

type UpdatePreviewProps = ComponentProps<'li'> & {
  title: string
  setIsEdited: React.Dispatch<React.SetStateAction<string | null>>
}

export const UpdatePreview = ({ title, setIsEdited, ...props }: UpdatePreviewProps) => {
  const [titleV, setTitleV] = useState<string>(title)
  const liRef = useRef<HTMLLIElement>(null)
  const updateNoteFilename = useSetAtom(updateNote)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!titleV) return

    const isUpdated = await updateNoteFilename(titleV)

    if (!isUpdated) {
      toast.error('Something went wrong', {
        position: 'bottom-right'
      })
      return
    }
    toast.success('Note updated successfully', {
      position: 'bottom-right'
    })
  }

  const onBlur = () => {
    setIsEdited('')
    setTitleV('')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (liRef.current && !liRef.current.contains(event.target as Node)) {
        onBlur()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [liRef])

  return (
    <li
      ref={liRef}
      className="px-3 py-2 transition-colors duration-100 rounded-md last:mb-14 bg-zinc-500/50"
      {...props}
    >
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onBlur={onBlur}
          className="bg-transparent border-none outline-none"
          placeholder="update title"
          value={titleV}
          onChange={(e) => setTitleV(e.target.value)}
        />
      </form>
    </li>
  )
}
