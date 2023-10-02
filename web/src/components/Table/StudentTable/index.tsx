"use client"

import { api } from "@/lib/axios"
import { RequisitionsTable, columns } from "./columns"
import { DataTable } from "./dataTable"
import { useEffect, useState } from "react"
import { useRole } from "@/contexts"
import { setTimeout } from "timers"

export default function StudentTable() {
    const { user, searchService } = useRole()
    const [requisitions, setRequisitions] = useState<RequisitionsTable[]>([])

  const fetchRequisitions = async () => {
    const { 
        data: { data } 
    } = await api.get(`/requisition/student/${user?.Student?.id}`) as { 
        data: { data: RequisitionsTable[] } 
    }

    console.log(data)

    data.forEach((requisition) => {
        const requisitionDate = new Date(requisition.createdAt)
        const formattedDate = requisitionDate.toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        }) + ' ' + requisitionDate.toLocaleTimeString('pt-BR', { 
            timeZone: 'UTC' 
        })
        requisition.createdAt = formattedDate

        const service = searchService(requisition.id)
        requisition.serviceId = service?.name || 'Não encontrado'

        requisition.status = requisition.status === 'OPENED' ? 'Aberto' : 'Concluído'
    })

    setRequisitions(data)
  }

  useEffect(() => {
    fetchRequisitions();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={requisitions} />
    </div>
  )
}
