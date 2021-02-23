#!/bin/sh
cd ../../src/dataset/revisions
FILES=*.json
for f in $FILES
do
  newname=`echo $f | sed -e 's/ /_/g'`
  mv "$f" "$newname"
  mongoimport --port=27017 -c=revisions -d=wikipedia-db --mode=merge --jsonArray --file=$newname
  echo "inserted  <-- $newname"
  # printf '%s\n' "${f%.json}"
done