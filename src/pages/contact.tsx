import Layout from '@/components/Layout';
import Container from '@/components/Container';
import FormRow from '@/components/FormRow';
import FormLabel from '@/components/FormLabel';
import InputText from '@/components/InputText';
import Button from '@/components/Button';
import { useState } from 'react';

function Contact() {
  const [state, setState] = useState('ready')
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>()
 

  async function handleOnSubmit(e: React.SyntheticEvent) {
    console.log('file', file)
    e.preventDefault()
    if( typeof file === 'undefined') return

    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', 'dfhv1dqu')
    formData.append('api_key', '137334764186192')
    
    const results = await fetch("https://api.cloudinary.com/v1_1/dxqwunxml/image/upload", {
      method: 'POST',
      body: formData
    }).then(r => r.json())
    console.log('results', results)
    setState('sent')
  
  }

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
      const target = e.target as HTMLInputElement & {
        files: FileList;
      }
    
      setFile(target.files[0]);
      const file = new FileReader 

      file.onload = function(){
        setPreview(file.result)
      }
      file.readAsDataURL(target.files[0])
    }
  
  return (
    <Layout>
      <Container>
        <h1 className="text-6xl font-black text-center text-slate-900 mb-20">
          Pudding brownie icing dragée lemon drops croissant.
        </h1>

        {state === 'sent' ? (
          <p className="text-center">Sent! Thanks for your message</p>
        ) : (
          <form className="max-w-md border border-gray-200 rounded p-6 mx-auto" onSubmit={handleOnSubmit}>
            <FormRow className="mb-5">
              <FormLabel htmlFor="name">Name</FormLabel>
              <InputText id="name" name="name" type="text" />
            </FormRow>

            <FormRow className="mb-5">
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputText id="email" name="email" type="email" />
            </FormRow>

            <FormRow className="mb-5">
              <FormLabel htmlFor="message">Message</FormLabel>
              <InputText id="message" name="message" type="text" />
            </FormRow>

            <FormRow className="mb-5">
              <FormLabel htmlFor="image">Image</FormLabel>
              <input id="image" type="file" name="image" accept="image/png, image/jpg, image/jpeg" onChange={handleOnChange}/>
              <img src={preview as string}/>
            </FormRow>

            <Button>Submit</Button>
          </form>
        )}
      </Container>
    </Layout>
  )
}

export default Contact;
