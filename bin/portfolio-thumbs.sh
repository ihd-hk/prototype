#!/bin/bash

IN_PATH="$1"
OUT_PATH="$2"

mogrify  -format jpg  -verbose  -auto-orient  -thumbnail "400x400^"  -gravity center  -crop 400x400+0+0  +repage  -path "$OUT_PATH"  -unsharp 0x.5 "$IN_PATH/*.jpg"
