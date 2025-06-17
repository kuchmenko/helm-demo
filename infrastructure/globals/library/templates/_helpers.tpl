{{- define "lib.fullname" -}}
{{ printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "lib.labels" -}}
app.kubernetes.io/name:      {{ .Chart.Name }}
app.kubernetes.io/instance:  {{ .Release.Name }}
app.kubernetes.io/version:   {{ default "dev" .Chart.AppVersion }}
{{- end -}}

{{- define "lib.selector" -}}
app: {{ .Chart.Name }}
{{- end -}}

