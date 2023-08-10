import { useNavigate } from 'react-router-dom'

export default function TestePage() {
  const navigate = useNavigate()

  return (
    <div className="m-auto">
      <div className="rounded-lg bg-white/80 p-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="mb-4 text-[40px]">Testing us</h1>
          <button className="mr-5 text-xl" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
        <p className="text-justify">
          Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo
          utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para
          fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a
          editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a
          Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado
          a softwares de editoração eletrônica como Aldus PageMaker.
        </p>
      </div>
    </div>
  )
}
