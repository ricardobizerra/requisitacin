"use client"

import { api } from "@/lib/axios"
import { RequisitionsTable, columns } from "./columns"
import { DataTable } from "./dataTable"
import { useEffect, useState } from "react"
import { useRole } from "@/contexts"
import dayjs from "dayjs"
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
        requisition.createdAt = dayjs(requisition.createdAt).format('DD/MM/YYYY HH:mm:ss')

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
