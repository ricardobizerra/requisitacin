"use client"

import { api } from "@/lib/axios"
import { RequisitionsTable, columns } from "./columns"
import { DataTable } from "./dataTable"
import { useEffect, useState } from "react"
import { useRole } from "@/contexts"

export default function UniversityTable() {
    const { user, searchStudent, searchService } = useRole()
    const [requisitions, setRequisitions] = useState<RequisitionsTable[]>([])

  const fetchRequisitions = async () => {
    const { 
        data: { data } 
    } = await api.get(`/requisition/university-section/${user?.universitySectionId}`) as { 
        data: { data: RequisitionsTable[] } 
    }

    data.forEach((requisition) => {
        const requisitionDate = new Date(requisition.createdAt)
        const formattedDate = requisitionDate.toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        }) + ' ' + requisitionDate.toLocaleTimeString('pt-BR', { 
            timeZone: 'UTC' 
        })
        requisition.createdAt = formattedDate

        const student = searchStudent(requisition.studentId)
        requisition.studentId = `${student?.name} (${student?.email.split('-')[0]})` || 'Não encontrado'

        const service = searchService(requisition.serviceId)
        requisition.serviceId = service?.name || 'Não encontrado'

        requisition.status = requisition.status === 'OPENED' ? 'Aberto' : 'Concluído'
    })

    setRequisitions(data)
  }

  useEffect(() => {
    fetchRequisitions();
  }, [user, requisitions]);    

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={requisitions} />
    </div>
  )
}
