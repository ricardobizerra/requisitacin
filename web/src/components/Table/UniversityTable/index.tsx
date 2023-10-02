"use client"

import { api } from "@/lib/axios"
import { RequisitionsTable, columns } from "./columns"
import { DataTable } from "./dataTable"
import { useEffect, useState } from "react"
import { useRole } from "@/contexts"
import dayjs from "dayjs"

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
      requisition.createdAt = dayjs(requisition.createdAt).format('DD/MM/YYYY HH:mm:ss')

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
  }, []);   

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={requisitions} />
    </div>
  )
}
