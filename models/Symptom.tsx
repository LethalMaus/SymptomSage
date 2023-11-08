export class Symptom {

name: string
description: string
severity: string
date: Date

constructor (name: string, description: string, severity: string, date: Date) {
   this.name = name
   this.description = description
   this.severity = severity
   this.date = date
}}