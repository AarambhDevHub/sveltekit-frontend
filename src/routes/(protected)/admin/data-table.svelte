<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Table from '@/components/ui/table';
    import { createTable, Render, Subscribe } from 'svelte-headless-table';
    import { addPagination } from "svelte-headless-table/plugins";
    import { writable } from 'svelte/store';

    type UsersData = {
        id: string;
        email: string;
        name: string;
        role: string;
    }

    export let usersData: UsersData[] = [];
    export let currentPage: number = 1;
    export let totalPage: number = 0;
    export let onPageChange: (newPage: number) => void;

    const tabelDataStore = writable(usersData);

    const tabel = createTable(tabelDataStore, {
        page: addPagination(),
    });

    const columns = tabel.createColumns([
        tabel.column({
            accessor: 'id',
            header: 'ID',
        }),
        tabel.column({
            accessor: 'email',
            header: 'Email',
        }),
        tabel.column({
            accessor: 'name',
            header: 'Name',
        }),
        tabel.column({
            accessor: 'role',
            header: 'Role',
        }),
    ]);

    const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = tabel.createViewModel(columns);

    $: hasPreviousPage = currentPage > 1;
    $: hasNextPage = currentPage < totalPage;

    const handlePageChange = (newPageIndex: number) => {
        onPageChange(newPageIndex);
    }

    $: tabelDataStore.set(usersData);

</script>

<div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <Table.Head {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs}>
                    <div class="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        <Render of={cell.render()} />
                    </div>
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
    <div class="flex items-center justify-end space-x-4 py-4">
        <Button
          variant="outline"
          size="sm"
          on:click={() => handlePageChange(currentPage - 1)}
          disabled={!hasPreviousPage}>Previous</Button
        >
        <Button
          variant="outline"
          size="sm"
          disabled={!hasNextPage}
          on:click={() => handlePageChange(currentPage + 1)}>Next</Button
        >
      </div>
    
  </div>
  