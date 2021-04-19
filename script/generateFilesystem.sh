mkdir filesystem;
cd filesystem;
for i in {1..10}
do
  echo "hello world $i" > "$i.txt"
  mkdir "$i"
  cd $i
  for j in {1..10}
  do
    echo "hello world $i.$j" > "$j.txt"
    mkdir "$j"
    cd $j
    for k in {1..10}
    do
      echo "hello world $i.$j.$k" > "$k.txt"
      mkdir "$k"
      cd $k
      for l in {1..10}
      do
        echo "hello world $i.$j.$k.$l" > "$l.txt"
        mkdir "$l"
        cd $l
        for m in {1..10}
        do
          echo "hello world $i.$j.$k.$l.$m" > "$m.txt"
        done
        cd ..
      done
      cd ..
    done
    cd ..
  done
  cd ..
done