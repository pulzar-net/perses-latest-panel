package model

import (
	"github.com/perses/shared/cue/common"
)

kind: "PulzrLatestPanel"
spec: close({
	format?:     common.#format
	formats?: [string]: common.#format
	thresholds?: common.#thresholds
	staleAfter?: number & >0
	labels?: [string]: string
})
