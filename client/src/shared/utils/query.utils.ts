import { QueryParamValue } from '@shared/types'

export function appendQueryArrayParam(
  searchParams: URLSearchParams,
  key: string,
  values?: readonly QueryParamValue[],
) {
  values?.forEach((value) => searchParams.append(key, String(value)))
}

export function normalizeQueryValues(values: string[]) {
  return values
    .flatMap((value) => value.split(','))
    .map((value) => value.trim())
    .filter(Boolean)
}

export function toNumberQueryValues(values: string[]) {
  return values.map((value) => Number(value))
}
