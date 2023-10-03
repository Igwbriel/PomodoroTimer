import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StarCountdownButton,
  StopCountdownButton,
} from './styles'

import { useContext } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdonw'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { CyclesContext } from '../../contexts/CyclesContext'

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ter no mínimo 5 minutos')
    .max(60, 'O ciclo pode ter no máximo 60 minutos'),
})

export function Home() {
  const { activeCycle, CreateNewCicle, InterruptedCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    CreateNewCicle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={InterruptedCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StarCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            começar
          </StarCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
