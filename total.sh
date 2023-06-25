
echo > total.tsx
for tsx in $(find nebula -name "*.tsx")
do
     cat ${tsx} |
        grep -v -E "^import " |
        grep -v -E "^export default " |
        sed "s/iourewugrhhiweoi//" >> total.tsx
done
